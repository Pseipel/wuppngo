package de.codeschluss.portal.components.category;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;

import de.codeschluss.portal.core.api.dto.FilterSortPaginate;
import de.codeschluss.portal.core.i18n.language.LanguageService;
import de.codeschluss.portal.core.service.QueryBuilder;

import java.util.List;

import org.springframework.stereotype.Service;

// TODO: Auto-generated Javadoc
/**
 * The Class CategoryQueryBuilder.
 * 
 * @author Valmir Etemi
 *
 */
@Service
public class CategoryQueryBuilder extends QueryBuilder<QCategoryEntity> {
  
  protected final String defaultSortProp = "translatables.name";
  
  /** The language service. */
  private final LanguageService languageService;
  
  /**
   * Instantiates a new category query builder.
   */
  public CategoryQueryBuilder(LanguageService languageService) {
    super(QCategoryEntity.categoryEntity);
    this.languageService = languageService;
  }
  
  @Override
  protected String prepareSort(String sortProp) {
    return sortProp.equals("name")
        ? "translatables." + sortProp
        : sortProp;
  }
  
  @Override
  public boolean localized() {
    return true;
  }
  
  @Override
  public Predicate search(FilterSortPaginate params) {
    List<String> locales = languageService.getCurrentReadLocales();
    BooleanBuilder search = new BooleanBuilder(withLocalized(locales));
    return params.isEmptyQuery()
        ? search.getValue()
        : searchFiltered(search, params);
  }
  
  /**
   * With localized.
   *
   * @param locales the locales
   * @return the predicate
   */
  private Predicate withLocalized(List<String> locales) {
    String defaultLang = languageService.getDefaultLocale();
    if (!locales.contains(defaultLang)) {
      locales.add(defaultLang);
    }
    return query.translatables.any().language.locale.in(locales);
  }
  
  /**
   * Search filtered.
   *
   * @param search the search
   * @param filter the filter
   * @return the predicate
   */
  private Predicate searchFiltered(BooleanBuilder search, FilterSortPaginate params) {
    String filter = prepareFilter(params.getFilter());
    return search.and(query.description.likeIgnoreCase(filter)
        .or(likeName(filter)));
  }

  /**
   * With name.
   *
   * @param name the name
   * @return the boolean expression
   */
  public BooleanExpression withName(String name) {
    return query.translatables.any().language.locale.in(languageService.getCurrentReadLocales())
        .and(query.translatables.any().name.eq(name));
  }

  /**
   * With any activity id.
   *
   * @param activityId the activity id
   * @return the predicate
   */
  public Predicate withAnyActivityId(String activityId) {
    return query.activities.any().id.eq(activityId);
  }

  /**
   * Name.
   *
   * @param filter the filter
   * @return the boolean expression
   */
  private BooleanExpression likeName(String filter) {
    return query.translatables.any().name.likeIgnoreCase(filter)
        .and(query.translatables.any().language.locale.in(languageService.getCurrentReadLocales()));
  }
}
