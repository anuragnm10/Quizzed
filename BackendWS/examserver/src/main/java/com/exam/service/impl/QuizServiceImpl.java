package com.exam.service.impl;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.entity.exam.Category;
import com.exam.entity.exam.Quiz;
import com.exam.repo.QuizRepo;
import com.exam.service.QuizService;

@Service
public class QuizServiceImpl implements QuizService{

	@Autowired
	private QuizRepo quizRepo;
	
	@Override
	public Quiz addQuiz(Quiz quiz) {
		return this.quizRepo.save(quiz);
	}

	@Override
	public Quiz updateQuiz(Quiz quiz) {
		return this.quizRepo.save(quiz);
	}

	@Override
	public Set<Quiz> getQuizzes() {
		return new LinkedHashSet<>(this.quizRepo.findAll());
	}

	@Override
	public Quiz getQuiz(Long quizID) {
		return this.quizRepo.findById(quizID).get();
	}

	@Override
	public void deleteQuiz(Long quizID) {
		this.quizRepo.deleteById(quizID);
		
	}

	@Override
	public List<Quiz> getQuizzesByCategory(Category category) {
		// TODO Auto-generated method stub
		return this.quizRepo.findBycategory(category);
	}

	@Override
	public List<Quiz> getActiveQuizzes() {
		
		return this.quizRepo.findByActive(true);
	}

	@Override
	public List<Quiz> getActiveQuizzesByCategory(Category c) {
		// TODO Auto-generated method stub
		return this.quizRepo.findByCategoryAndActive(c, true);
	}

}
