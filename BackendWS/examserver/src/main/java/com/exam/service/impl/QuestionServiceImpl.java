package com.exam.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;
import com.exam.repo.QuestionRepo;
import com.exam.service.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService{

	@Autowired
	private QuestionRepo questionRepo;
	
	@Override
	public Question addQuestion(Question question) {
		return this.questionRepo.save(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		return this.questionRepo.save(question);
	}

	@Override
	public Set<Question> getAllQuestions() {
		return new HashSet<>(this.questionRepo.findAll());
	}

	@Override
	public Question getQuestion(Long quesId) {
		return this.questionRepo.findById(quesId).get();
	}

	@Override
	public Set<Question> getAllQuestionsOfQuiz(Quiz quiz) {
		return this.questionRepo.findByQuiz(quiz);
	}

	@Override
	public void deleteQuestion(Long quesId) {
		Question question = new Question();
		question.setQuesId(quesId);
		this.questionRepo.delete(question);
	}

	@Override
	public Question get(Long questionId) {
		// TODO Auto-generated method stub
		return this.questionRepo.getOne(questionId);
	}
	
	

}
