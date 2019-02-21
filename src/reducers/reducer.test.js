import reducer from './reducer';
import {restartGame, makeGuess, auralUpdate} from '../actions/action'

describe('Reducer', () => {
  it('should set to initialState if empty action is dispatched', () => {
      const state = reducer(undefined, {type: '__UNKNOWN'});

      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual('Make your guess!');
      expect(state.auralStatus).toEqual('');
      expect(state.correctAnswer).toBeLessThanOrEqual(100);
      expect(state.correctAnswer).toBeGreaterThanOrEqual(1);
  })

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  });

  describe('restartGame', () => {
    it('Should start a new game', () => {
      let state = {
        guesses: [1,4,55,66,3],
        feedback: 'You are warm',
        auralStatus: 'you have made 2 guesses',
        correctAnswer: 34
      };
      const correctAnswer = 10;
      state = reducer(state,restartGame(correctAnswer));
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual('Make your guess!');
      expect(state.auralStatus).toEqual('');
      expect(state.correctAnswer).toEqual(correctAnswer);
    })
  })

  describe('makeGuess', () => {
    it('Should make a guess and add it to state', () => {
      let state = {
        guesses:[],
        correctAnswer:1
      };

      state = reducer(state, makeGuess(70));
      expect(state.feedback).toEqual('You\'re Ice Cold...');

      state = reducer(state, makeGuess(31));
      expect(state.feedback).toEqual('You\'re Cold...');

      state = reducer(state, makeGuess(11));
      expect(state.feedback).toEqual('You\'re Warm.');

      state = reducer(state, makeGuess(2));
      expect(state.feedback).toEqual('You\'re Hot!');

      state = reducer(state, makeGuess(1));
      expect(state.feedback).toEqual('You got it!');

      state = reducer(state, makeGuess(4));
      expect(state.guesses).toEqual([70,31,11,2,1,4])

    })
  })

  describe('auralUpdate', () => {
    it('Can generate aural updates', () => {
      let state = {
        guesses: [25, 3, 90],
        feedback: "You're Warm.",
        auralStatus: ''
      };

      state = reducer(state, auralUpdate());
      expect(state.auralStatus).toEqual(
        "Here's the status of the game right now: You're Warm. You've made 3 guesses. In order of most- to least-recent, they are: 90, 3, 25"
      );
    });
  })
})
