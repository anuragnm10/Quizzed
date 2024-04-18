package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entity.Role;
import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncoder;
	
	@GetMapping("/test")
	public String test() {
		return "Welcome to backend api of Quizzed";
	}

	//creating user
	@PostMapping("/register")
	public User createUser(@RequestBody User user) throws Exception {
		
		user.setPassword(this.bcryptPasswordEncoder.encode(user.getPassword()));
		
		Set<UserRole> userRoles = new HashSet<>();
		Role role = new Role();
		role.setRoleName("USER");
		UserRole userRole = new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);
		userRoles.add(userRole);
		return this.userService.createUser(user, userRoles);
	}
	
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username ) {
		return this.userService.getUser(username);
	}
	
	
	
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable ("userId") long id) {
		this.userService.deleteUser(id);
	}
	
//	@PutMapping("/")
//	public User updateUser(@RequestBody User user) {
//		return this.userService.updateUser(user);
//	}
}
