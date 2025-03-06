const dashjs = {
    MediaPlayer: function() {
      return {
        create: jest.fn(() => ({
          initialize: jest.fn(),
          attachView: jest.fn(),
          attachSource: jest.fn(),
          on: jest.fn()
        }))
      };
    }
  };
  
  export default dashjs;
  export const MediaPlayer = dashjs.MediaPlayer;