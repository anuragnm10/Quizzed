package com.exam.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.entity.exam.Question;
import com.exam.entity.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;

@RestController
@RequestMapping("/question")
@CrossOrigin("*")
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private QuizService quizService;
	
	@PostMapping("/")
	public ResponseEntity<?> addQuestion(@RequestBody Question question){
		return ResponseEntity.ok(this.questionService.addQuestion(question));
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateQuestion(@RequestBody Question question){
		return ResponseEntity.ok(this.questionService.updateQuestion(question));
	}
	
	@GetMapping("/quiz/{quizId}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("quizId") Long quizId){
//		Quiz quiz = new Quiz();
//		quiz.setqId(quizId);
//		Set<Question> questionsOfQuiz = this.questionService.getAllQuestionsOfQuiz(quiz);
//		return ResponseEntity.ok(questionsOfQuiz);
		
		Quiz quiz = this.quizService.getQuiz(quizId);
		Set<Question> questions = quiz.getQuestions();
		List<Question> list = new ArrayList(questions);
		if(list.size()>quiz.getNoOfQuestions()) {
			list = list.subList(0, quiz.getNoOfQuestions());
		}
		
		list.forEach((q)->{
			q.setAnswer("");
		});
		
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/quiz/all/{quizId}")
	public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("quizId") Long quizId){
		Quiz quiz = new Quiz();
		quiz.setqId(quizId);
		Set<Question> questionsOfQuiz = this.questionService.getAllQuestionsOfQuiz(quiz);
		return ResponseEntity.ok(questionsOfQuiz);
		
	}
	
	
	@GetMapping("/{quesId}")
	public Question getQuestion(@PathVariable("quesId") Long quesId) {
		return this.questionService.getQuestion(quesId);
	}
	
	@DeleteMapping("/{quesId}")
	public void delete(@PathVariable("quesId") Long quesId) {
		this.questionService.deleteQuestion(quesId);
	}
	
	
	//evaluate quiz
	
	@PostMapping("/evaluate-quiz")
	public ResponseEntity<?> evaluateQuiz(@RequestBody List<Question> questions){
		
		double marksObtained = 0.0;
		Integer correctAnswers = 0;
		Integer attemptedQuestions = 0;
		for(Question q:questions){
			Question question = this.questionService.get(q.getQuesId());
			if(question.getAnswer().trim().equals(q.getGivenAnswer()!=null?q.getGivenAnswer().trim():q.getGivenAnswer())) {
				//correct
				attemptedQuestions++;
				correctAnswers++;
				
				double marksPerQ = questions.get(0).getQuiz().getMaxMarks()/questions.size();
				
				marksObtained += marksPerQ; 
				
			}else {
				if(q.getGivenAnswer()!=null) {
					attemptedQuestions++;
				}
				System.out.println(question.getAnswer() +"does not match with the ans "+q.getGivenAnswer());
			}
			
		}
		Map<String, Object> map = Map.of("marksObtained",marksObtained,"correctAnswers",correctAnswers,"attemptedQuestions",attemptedQuestions);
		return ResponseEntity.ok(map);
	}
	
	
}
