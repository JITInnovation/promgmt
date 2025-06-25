package com.promgmt;

import com.promgmt.models.ERole;
import com.promgmt.models.Role;
import com.promgmt.models.User;
import com.promgmt.repositories.RoleRepository;
import com.promgmt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(ERole.ROLE_DEVELOPER));
            roleRepository.save(new Role(ERole.ROLE_MANAGER));
            roleRepository.save(new Role(ERole.ROLE_SA));
        }

        if (userRepository.count() == 0) {
                        User user = new User("sa", "sa@promgmt.com", encoder.encode("sa123"));
            Set<Role> roles = new HashSet<>();
            Role adminRole = roleRepository.findByName(ERole.ROLE_SA)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);
            user.setRoles(roles);
            userRepository.save(user);
        }
    }
}
