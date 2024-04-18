package com.exam;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.service.UserService;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner{

	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncoder;
	
	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Starting code");
		
		
//		 User user = new User(); user.setFirstName("Anurag");
//		 user.setLastName("Mahoorkar"); user.setUsername("anuragnm10");
//		 user.setPassword(bcryptPasswordEncoder.encode("abc123"));
//		 user.setEmail("anm10@abc.com"); user.setPhone("8747070895");
//		 user.setProfile("absc.png");
//		  
//		 Role role = new Role(); role.setRoleName("Admin");
//		  
//		 Set<UserRole> userRoles = new HashSet<>(); UserRole userRole = new
//		 UserRole(); userRole.setRole(role); userRole.setUser(user);
//		 userRoles.add(userRole);
//		  
//		 User insertedUser = this.userService.createUser(user, userRoles);
//		 System.out.println(insertedUser);
		 
	}

}
