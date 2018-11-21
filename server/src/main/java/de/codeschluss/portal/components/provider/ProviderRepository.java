package de.codeschluss.portal.components.provider;

import de.codeschluss.portal.components.organisation.OrganisationEntity;
import de.codeschluss.portal.components.user.UserEntity;
import de.codeschluss.portal.core.common.DataRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProviderRepository extends DataRepository<ProviderEntity> {

  @Query("Select p from ProviderEntity p where "
      + "p.user.username like %?1% "
      + "or p.user.fullname like %?1% "
      + "or p.user.phone like %?1%")
  Optional<List<ProviderEntity>> findFiltered(String filter, Sort sort);

  @Query("Select p from ProviderEntity p where "
      + "p.user.username like %?1% "
      + "or p.user.fullname like %?1% "
      + "or p.user.phone like %?1%")
  Optional<Page<ProviderEntity>> findFiltered(String filter, Pageable pageable);

  Optional<List<ProviderEntity>> findByUserId(String userId);

  Optional<List<ProviderEntity>> findByOrganisationId(String orgaId);

  Optional<ProviderEntity> findByActivitiesId(String activityId);

  Optional<ProviderEntity> findByUserIdAndOrganisationId(String userId, String orgaId);

  boolean existsByUserIdAndOrganisationIdIn(String userId, List<String> organisationId);

  Optional<List<ProviderEntity>> findByUserAndApprovedTrue(UserEntity user);

  Optional<List<ProviderEntity>> findByUserAndAdminTrue(UserEntity user);

  Optional<List<ProviderEntity>> findByOrganisationAndAdminTrue(OrganisationEntity organisation);
}
