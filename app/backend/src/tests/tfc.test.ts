import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { app } from '../app';
import teams from '../database/models/teamsModel';
import teamsMock from './mocks/teams.mock';

import matches from '../database/models/matchesModel';
import matchesMock from './mocks/matches.mock';
import matchesInProgressMock from './mocks/matchesInProgress.mock';

import login from '../database/models/usersModel';
import { ILogin } from '../database/interfaces/ILogin';

chai.use(chaiHttp);

const { expect } = chai;
const newMatches = { "homeTeamGoals": 3, "awayTeamGoals": 1}
const dadosInsert = {
      "homeTeamId": 3,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 1,
      "inProgress": true
    }

const loginValid: ILogin = {email: 'user@user.com', password: 'secret_user'}
const emailInvalid: ILogin = {email: '@user.com', password: 'secret_user'}
const passwordInvalid: ILogin = {email: 'user@user.com', password: 'senha_invalida'}
const onlyEmail = {email: 'user@user.com'}
const onlyPassword = {password: 'senha_invalida'}
const validUser = {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user',
    }
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"

describe('Testando a model de teams', () => {
  it('Retorna a lista completa de teams', async () => {
    beforeEach(function () {
    sinon.stub(teams, 'findAll')
      .resolves(teamsMock);
  });

  afterEach(function () {
    sinon.restore();
  });
    const response = await chai
    .request(app)
    .get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMock);
  });

  it('Retorna dados de um time específico de teams', async () => {
    beforeEach(function () {
      sinon.stub(teams, 'findByPk')
      .resolves(teamsMock[0])
  });

  afterEach(function () {
    sinon.restore();
  });
    const response = await chai
    .request(app)
    .get('/teams/6');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMock[5]);
  });
});

describe('Testando users', () => {
  it('Testando o login com os dados válidos', async () => {
  afterEach(function () {
    sinon.restore()
  });
    const response = await chai
    .request(app)
    .post('/login')
    .send(loginValid);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('token');
    
  });

  it('Testando o login com o email inválido', async () => {
    afterEach(function () {
      sinon.restore()
    });
    const response = await chai
    .request(app)
    .post('/login')
    .send(emailInvalid);
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({"message": "Invalid email or password"});
  });

  it('Testando o login com o password inválido', async () => {
    afterEach(function () {
      sinon.restore()
    });
    const response = await chai
    .request(app)
    .post('/login')
    .send(passwordInvalid);
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({"message": "Invalid email or password"});
  });

  it('Testando o login sem o password', async () => {
    afterEach(function () {
      sinon.restore()
    });
    const response = await chai
    .request(app)
    .post('/login')
    .send(onlyEmail);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({"message": "All fields must be filled"});
  });

    it('Testando o login sem o email', async () => {
    afterEach(function () {
      sinon.restore()
    });
    const response = await chai
    .request(app)
    .post('/login')
    .send(onlyPassword);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({"message": "All fields must be filled"});
  });

    it('Testando se o endpoint /login/role retornar a role do user', async () => {
    afterEach(function () {
      sinon.restore()
    });
    const response = await chai
    .request(app)
    .get('/login/role')
    .send(loginValid)
    .set('Authorization', `${token}`);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({role: validUser.role });
  });

    it('Testando se o endpoint /login/role sem o token retornar erro', async () => {
    afterEach(function () {
      sinon.restore()
    });
    const response = await chai
    .request(app)
    .get('/login/role')
    .send(loginValid)
    .set('Authorization', '');
    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({"message": "Token not found" });
  });

  //   it('Testando se o endpoint /login/role com o token inválido retorna erro', async () => {
  //   afterEach(function () {
  //     sinon.restore()
  //   });
  //   const response = await chai
  //   .request(app)
  //   .get('/login/role')
  //   .send(loginValid)
  //   .set('Authorization', 'token');
  //   expect(response.status).to.be.equal(401);
  //   expect(response.body).to.be.deep.equal({"message": "Token must be a valid token" });
  // });
});

describe('Testando matches', () => {
  it('Retorna a lista completa de matches', async () => {
    beforeEach(function () {
      sinon.stub(matches, 'findAll')
      .resolves(matchesMock)
    });
    afterEach(function () {
      sinon.restore()
    });
    const response = await chai
    .request(app)
    .get('/matches');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesMock);
  });

  it('Retorna a lista matches in progress', async () => {
    beforeEach(function () {
      sinon.stub(matches, 'findAll')
      .resolves(matchesMock)
    });
    afterEach(function () {
      sinon.restore()
    });
    const response = await chai
    .request(app)
    .get('/matches')
    .query({inProgress: true});
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesInProgressMock);
  });

  // it('Testa se é possível finalizar uma partida', async () => {
  // beforeEach(function () {
    //   sinon.stub(matches, 'update')
    //   .resolves()
    // });
    // afterEach(function () {
    //   sinon.restore()
    // });
    // const response = await chai
    // .request(app)
    // .patch('/matches/45/finish');
    // expect(response.status).to.be.equal(200);
    // expect(response.body).to.be.deep.equal({"message": "Finished"});
  // });

  // it('Testa se é possível atualizar partidas em andamento', async () => {
  //   beforeEach(function () {
  //     sinon.stub(matches, 'update')
  //     .resolves()
  //   });
  //   afterEach(function () {
  //     sinon.restore()
  //   });
  //   const response = await chai
  //   .request(app)
  //   .patch('/matches/45')
  //   .send(newMatches);
  //   expect(response.status).to.be.equal(200);
  //   expect(response.body).to.be.deep.equal({});
  // });

  // it('Testa se é possível cadastrar uma nova partida ', async () => {
  //   beforeEach(function () {
  //     sinon.stub(matches, 'create')
  //     .resolves();
  //   afterEach(function () {
  //     sinon.restore()
  //   });
  //   const response = await chai
  //   .request(app)
  //   .post('/matches')
  //   .send(dadosInsert);
  //   expect(response.status).to.be.equal(200);
  //   expect(response.body).to.be.deep.equal({
  //     "homeTeamId": 3,
  //     "awayTeamId": 8,
  //     "homeTeamGoals": 2,
  //     "awayTeamGoals": 1,
  //     "inProgress": true
  //   });
  // });  

  // it('Testa se não é possível inserir uma partida com times iguais', async () => {
  // //   beforeEach(function () {
  // //     sinon.stub(matches, 'create')
  // //     .resolves()
  // //   });
  //   afterEach(function () {
  //     sinon.restore()
  //   });
  //   const response = await chai
  //   .request(app)
  //   .post('/matches')
  //   .set('Authorization', `${token}`)
  //   .send({
  //     "homeTeamId": 3,
  //     "awayTeamId": 3,
  //     "homeTeamGoals": 1,
  //     "awayTeamGoals": 1,
  //   });
  //   expect(response.status).to.be.equal(422);
  //   expect(response.body).to.be.deep.equal({"message": "It is not possible to create a match with two equal teams"});
  
  // it('Testa se não é possível inserir uma partida com um time que não existe na tabela de times', async () => {
  //   beforeEach(function () {
  //     sinon.stub(matches, 'findByPk')
  //     .resolves()
  //   });
  //   afterEach(function () {
  //     sinon.restore()
  //   });
  //   const response = await chai
  //   .request(app)
  //   .post('/matches')
  //   .send({
  //     "homeTeamId": 1403,
  //     "awayTeamId": 30045,
  //     "homeTeamGoals": 1,
  //     "awayTeamGoals": 1,
  //   });
  //   expect(response.status).to.be.equal(404);
  //   expect(response.body).to.be.deep.equal({"message": "There is no team with such id!"});
  // })
});
