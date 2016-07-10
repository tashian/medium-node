import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import Medium from '../src/medium';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Medium', function() {
  before(() => {
    nock.disableNetConnect();

    nock('https://medium.com/')
      .get('/@samples/latest?format=json')
      .replyWithFile(200, __dirname + '/samples/medium.json');

    nock('https://medium.com')
      .get('/@nothing/latest?format=json')
      .reply(200, '{}');

    nock('https://medium.com')
      .get('/@fail/latest?format=json')
      .reply(500);
  });

  it('should accept usernames with @', function() {
    expect(() => new Medium('@nothing')).to.not.throw(Error);
  });

  it('should accept usernames without @', function() {
    expect(() => new Medium('nothing')).to.not.throw(Error);
  });

  it('should reject invalid usernames', function() {
    expect(new Medium('n@@ot@hing')).to.be.an.instanceof(Error);
  });

  it('should get the JSON feed', function() {
    var medium = new Medium('samples');
    return expect(medium.fetch()).to.eventually.have.property('posts');
  });

  it('should reject when HTTP errors occur', function() {
    var medium = new Medium('fail');
    return expect(medium.fetch()).to.be.rejectedWith('Error: 500');
  });
});
