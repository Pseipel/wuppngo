package de.codeschluss.portal.core.common;

import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.EntityPathBase;

import de.codeschluss.portal.core.exception.NotFoundException;
import de.codeschluss.portal.core.utils.FilterSortPaginate;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;

// TODO: Auto-generated Javadoc
/**
 * The Class DataService.
 *
 * @param <E>
 *          the element type
 * @param <R>
 *          the generic type
 */
public abstract class DataService<E extends BaseEntity, Q extends EntityPathBase<E>> {

  /** The repo. */
  protected final DataRepository<E> repo;

  /** The assembler. */
  protected final PagingAndSortingAssembler<E> assembler;
  
  protected final Q query;

  /** The default sort prop. */
  protected final String defaultSortProp = "id";

  /**
   * Instantiates a new data service.
   *
   * @param repo
   *          the repo
   * @param assembler
   *          the assembler
   */
  public DataService(
      DataRepository<E> repo, 
      PagingAndSortingAssembler<E> assembler,
      Q query) {
    this.repo = repo;
    this.assembler = assembler;
    this.query = query;
  }

  /**
   * Exists.
   *
   * @param example
   *          the example
   * @return true, if successful
   */
  public boolean exists(Example<E> example) {
    return repo.exists(example);
  }

  /**
   * Exists by id.
   *
   * @param id
   *          the address id
   * @return true, if successful
   */
  public boolean existsById(String id) {
    return repo.existsById(id);
  }

  /**
   * Gets the resource by id.
   *
   * @param id
   *          the id
   * @return the resource by id
   */
  public Resource<E> getResourceById(String id) {
    return assembler.toResource(getById(id));
  }

  /**
   * Gets the by id.
   *
   * @param id
   *          the id
   * @return the by id
   */
  public E getById(String id) {
    return repo.findById(id).orElseThrow(() -> new NotFoundException(id));
  }

  /**
   * Gets the by ids.
   *
   * @param entityIds
   *          the entity ids
   * @return the by ids
   */
  public List<E> getByIds(List<String> entityIds) {
    return repo.findByIdIn(entityIds)
        .orElseThrow(() -> new NotFoundException(entityIds.toString()));
  }

  /**
   * Adds the resource.
   *
   * @param newEntity
   *          the new entity
   * @return the resource
   */
  public Resource<E> addResource(E newEntity) {
    return assembler.toResource(add(newEntity));
  }

  /**
   * Adds the.
   *
   * @param newEntity
   *          the new entity
   * @return the e
   */
  public E add(E newEntity) {
    E duplicate = getExisting(newEntity);
    return duplicate != null ? duplicate : repo.save(newEntity);
  }

  /**
   * Adds the all.
   *
   * @param newEntities
   *          the new entities
   * @return the list
   */
  public List<E> addAll(List<E> newEntities) {
    return newEntities.stream().map(entity -> {
      E duplicate = getExisting(entity);
      return duplicate != null ? duplicate : repo.save(entity);
    }).collect(Collectors.toList());
  }

  /**
   * Gets the existing.
   *
   * @param newEntity
   *          the new entity
   * @return the existing
   */
  public abstract E getExisting(E newEntity);

  /**
   * Update resource.
   *
   * @param id
   *          the id
   * @param updatedEntity
   *          the updated entity
   * @return the resource
   */
  public Resource<E> updateResource(String id, E updatedEntity) {
    return assembler.toResource(update(id, updatedEntity));
  }

  /**
   * Update.
   *
   * @param id
   *          the id
   * @param updatedEntity
   *          the updated entity
   * @return the e
   */
  public abstract E update(String id, E updatedEntity);

  /**
   * Delete.
   *
   * @param id
   *          the id
   */
  public void delete(String id) {
    repo.deleteById(id);
  }

  /**
   * Gets the sorted list resources.
   *
   * @param <P>
   *          the generic type
   * @param params
   *          the params
   * @return the sorted list resources
   */
  public <P extends FilterSortPaginate> Resources<?> getSortedListResources(P params) {
    List<E> result = getSortedList(params.getFilter(), getSort(params));
    return assembler.entitiesToResources(result, params);
  }

  /**
   * Gets the sorted list.
   *
   * @param filter
   *          the filter
   * @param sort
   *          the sort
   * @return the sorted list
   */
  public List<E> getSortedList(String filter, Sort sort) {
    List<E> result =  filter == null 
        ? repo.findAll(sort)
        : repo.findAll(getFilteredPredicate(filter), sort);
    
    if (result == null || result.isEmpty()) {
      throw new NotFoundException(filter);
    }
    
    return result;
  }

  /**
   * Gets the paged resources.
   *
   * @param <P>
   *          the generic type
   * @param params
   *          the params
   * @return the paged resources
   */
  public <P extends FilterSortPaginate> PagedResources<Resource<E>> getPagedResources(P params) {
    String filter = params.getFilter();
    PageRequest page = PageRequest.of(params.getPage(), params.getSize(), getSort(params));
    return assembler.entitiesToPagedResources(getPaged(filter, page), params);
  }

  /**
   * Gets the paged.
   *
   * @param filter
   *          the filter
   * @param page
   *          the page
   * @return the paged
   */
  public Page<E> getPaged(String filter, PageRequest page) {
    Page<E> paged = filter == null ? repo.findAll(page)
        : repo.findAll(getFilteredPredicate(filter), page);
    
    if (paged == null || paged.isEmpty()) {
      throw new NotFoundException(filter);
    }
    
    return paged;
  }

  /**
   * Gets the sort.
   *
   * @param params
   *          the params
   * @return the sort
   */
  protected Sort getSort(FilterSortPaginate params) {
    return params.createSort(defaultSortProp);
  }

  protected abstract Predicate getFilteredPredicate(String filter);
  
  protected String prepareFilter(String filter) {
    return "%" + filter + "%"; 
  }
}
