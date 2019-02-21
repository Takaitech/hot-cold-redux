
import {
    RESTART_GAME,
    restartGame,
    MAKE_GUESS,
    makeGuess,
    auralUpdate,
    AURAL_UPDATE
} from '../actions/action';

describe('auralUpdate', () => {
  it('should return the action', () => {
    const action = auralUpdate();
    expect(action.type).toEqual(AURAL_UPDATE);
  })
})

describe('restartGame', () => {
  it('should return the action', () => {
    const correctAnswer = 1;
    const action = restartGame(correctAnswer);
    expect(action.type).toEqual(RESTART_GAME);
    expect(action.correctAnswer).toEqual(1);
  })
})
describe('makeGuess', () => {
  it('should return the action', () => {
    const guess = 4;
    const action = makeGuess(guess);
    expect(action.type).toEqual(MAKE_GUESS);
    expect(action.guess).toEqual(guess)
  })
})
