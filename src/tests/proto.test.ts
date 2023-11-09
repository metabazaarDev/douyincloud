import protobuf from 'protobufjs';

describe('GET /', () => {
  const data = {
    RoundScore: 111,
    VictoryScore: 222,
    WinStreakScore: 333,
  };
  const data2 = {
    RoundScore: 'not a number',
    VictoryScore: 222,
    WinStreakScore: 333,
  };
  it('should proto!', async () => {
    const root = await protobuf.load('./src/proto/message.proto');
    const ScoreInfo = root.lookupType('SocketMessage.ScoreInfo');
    expect(ScoreInfo.verify(data)).toBe(null);
    expect(ScoreInfo.verify(data2)).toBe('RoundScore: integer expected');
    const buf = ScoreInfo.encode(data).finish();
    const obj = ScoreInfo.decode(buf);
    expect(obj).toEqual(data);
  });
});
