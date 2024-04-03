import { Test, TestingModule } from '@nestjs/testing';
import { PodcasteController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: PodcasteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PodcasteController],
      providers: [AppService],
    }).compile();

    appController = app.get<PodcasteController>(PodcasteController);
  });

  const page = '1';
  const region = 'us';
  const safe_mode = '1';
  const genre_id = '68';
  describe('root', () => {
    it('should return "page"', () => {
      const mockReq: Partial<Request> = {
        user: { id: 1 },
        params: {},
        query: {},
        body: {},
        headers: {},
        method: '',
        url: '',
        get: jest.fn(),
        header: jest.fn(),
        accepts: jest.fn(),
        acceptsCharsets: jest.fn(),
        // ... add other methods as needed
      }; // Mock request object
      const mockQuery = { page, region, safe_mode, genre_id }; // Mock query parameters

      expect(appController.getBest_Podcast(mockReq, mockQuery)).toBeCalledWith(
        page,
      );
    });
  });
});
