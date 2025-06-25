package com.promgmt.repositories;

import java.util.Optional;

import com.promgmt.models.ERole;
import com.promgmt.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
