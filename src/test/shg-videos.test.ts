import { describe, expect, it } from 'vitest';
import { youtubeIdFromUrl } from '@/components/shg-videos';

describe('YouTube video links', () => {
  it.each([
    'https://www.youtube.com/watch?v=abcdefghijk',
    'https://youtu.be/abcdefghijk?t=30',
    'https://www.youtube.com/shorts/abcdefghijk',
    'https://www.youtube.com/live/abcdefghijk',
  ])('accepts supported video URL %s', url => {
    expect(youtubeIdFromUrl(url)).toBe('abcdefghijk');
  });
  it.each([
    'https://youtube.com.evil.test/watch?v=abcdefghijk',
    'https://evil.test/abcdefghijk',
    'javascript:alert(1)',
    'http://youtube.com/watch?v=abcdefghijk',
    'https://youtube.com/watch?v=short',
    'https://youtube.com/@channel',
    'https://user:password@youtube.com/watch?v=abcdefghijk',
  ])('rejects unsafe or non-video URL %s', url => {
    expect(youtubeIdFromUrl(url)).toBeUndefined();
  });
});