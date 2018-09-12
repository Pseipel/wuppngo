package de.codeschluss.wupportal.provider;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;

import de.codeschluss.wupportal.base.FilteredJpaRepository;
import de.codeschluss.wupportal.user.UserEntity;

public interface ProviderRepository extends FilteredJpaRepository<ProviderEntity, String> {
	
	Optional<List<ProviderEntity>> findByUser(UserEntity user);
		
	Optional<List<ProviderEntity>> findPagedByOrganisationId(String organisationId, Pageable page);

	@Query("Select p from ProviderEntity p where p.user.username like %?1% or p.user.fullname like %?1% or p.user.phone like %?1%")
	Optional<List<ProviderEntity>> findFiltered(String filter, Sort sort);
	
	@Query("Select p from ProviderEntity p where p.user.username like %?1% or p.user.fullname like %?1% or p.user.phone like %?1%")
	Optional<Page<ProviderEntity>> findFiltered(String filter, Pageable pageable);

}
