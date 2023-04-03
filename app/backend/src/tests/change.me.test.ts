import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import teams from '../database/models/teamsModel';
import teamsMock from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a model de teams', () => {
    beforeEach(function () {
    sinon.stub(teams, 'findAll')
      .resolves(teamsMock);
  });

  afterEach(function () {
    sinon.restore();
  });
  it('Retorna a lista completa de teams', async () => {
    const response = await chai
    .request(app)
    .get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMock);
  });
});
