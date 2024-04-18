package com.exam.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	//creating User
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		
		User localUser = this.userRepo.findByUsername(user.getUsername());
		if(localUser!=null) {
			System.out.println("User already exists!");
			throw new Exception("User already exists!");
		}else {
			for(UserRole val: userRoles) {
				roleRepo.save(val.getRole());
			}
			
			user.getUserRole().addAll(userRoles);
			localUser = this.userRepo.save(user);
		}
		return localUser;
	}

	@Override
	public User getUser(String username) {
		
		return this.userRepo.findByUsername(username);
	}

	@Override
	public void deleteUser(long id) {
		
		this.userRepo.deleteById(id);
	}

	@Override
	public User updateUser(User user) {
		return this.userRepo.save(user);
	}

}
