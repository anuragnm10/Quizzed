package com.exam.service;

import java.util.Set;

import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;

public interface QuestionService {
	
	public Question addQuestion(Question question);
	
	public Question updateQuestion(Question question);
	
	public Set<Question> getAllQuestions();
	
	public Question getQuestion(Long quesId);
	
	public Set<Question> getAllQuestionsOfQuiz(Quiz quiz);
	
	public void deleteQuestion(Long quesId);

	public Question get(Long questionId);
	
}
