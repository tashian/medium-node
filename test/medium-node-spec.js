import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import _ from 'underscore';
import nock from 'nock';
import mediumUser from '../lib/medium-node';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Medium', function() {
  before( () => {
    nock.disableNetConnect();

    nock('https://medium.com/')
      .get('@blah/latest?format=json')
      .replyWithFile(200, __dirname + '/samples/medium.json');

    nock('https://medium.com')
      .get('@nothing/latest?format=json')
      .reply(200, '{}');

    nock('https://medium.com')
      .get('@fail/latest?format=json')
      .reply(500);
  });

  it('should accept usernames with @', function() {
    expect(mediumUser('@nothing')).not.to.be.rejected;
  });

  it('should accept usernames without @', function() {
    expect(mediumUser('nothing')).not.to.be.rejected;
  });

  it('should reject invalid usernames', function() {
    expect(mediumUser('n@@ot@hing')).to.be.rejected;
  });

  it('should get the JSON feed', function() {
    expect(mediumUser('blah')).to.eventually.equal('asda');
  });

  it('should reject when HTTP errors occur', function() {
    expect(mediumUser('fail')).to.be.rejectedWith('sdfs');
  });
});
