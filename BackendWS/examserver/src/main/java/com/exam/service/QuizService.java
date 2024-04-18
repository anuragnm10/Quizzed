package com.exam.service;

import java.util.List;
import java.util.Set;

import com.exam.entity.exam.Category;
import com.exam.entity.exam.Quiz;

public interface QuizService {
	
	public Quiz addQuiz(Quiz quiz);
	
	public Quiz updateQuiz(Quiz quiz);
	
	public Set<Quiz> getQuizzes();
	
	public Quiz getQuiz(Long quizID);
	
	public void deleteQuiz(Long quizID);

	public List<Quiz> getQuizzesByCategory(Category category);

	public List<Quiz> getActiveQuizzes();
	
	public List<Quiz> getActiveQuizzesByCategory(Category c);
	
	

}
