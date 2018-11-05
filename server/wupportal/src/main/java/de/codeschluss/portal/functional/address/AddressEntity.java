package de.codeschluss.portal.functional.address;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.codeschluss.portal.common.base.BaseEntity;
import de.codeschluss.portal.functional.activity.ActivityEntity;
import de.codeschluss.portal.functional.organisation.OrganisationEntity;
import de.codeschluss.portal.functional.suburb.Suburb;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The persistent class for the addresses database table.
 * 
 */
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor
@Entity
@Table(name = "addresses")
public class AddressEntity extends BaseEntity implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Column(name = "house_number")
	private String houseNumber;

	private String place;

	@Column(name = "postal_code")
	private String postalCode;

	private String street;

	@ManyToOne
	@JsonIgnore
	private Suburb suburb;

	private float latitude;

	private float longitude;

	@OneToMany(mappedBy = "address")
	@JsonIgnore
	private List<ActivityEntity> activities;

	@OneToMany(mappedBy = "address")
	@JsonIgnore
	private List<OrganisationEntity> organisations;
}