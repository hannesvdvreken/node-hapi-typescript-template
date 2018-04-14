import { config } from '../../src/config/environment';
import * as models from '../../src/model';
import { expect } from 'chai';
import { Server, ServerInjectResponse } from 'hapi';
import { routes } from '../../src/route';
import { globalRouteOptions } from '../../src/config/gobalRouteOptions';

describe('MonitorRoute', () => {
  const server = new Server({
    host: config.get('host'),
    port: config.get('port'),
    routes: globalRouteOptions
  });
  server.route(routes);

  describe('liveness', () => {
    it('responds with 200 status code and correct payload', async () => {
      const res: ServerInjectResponse = await server.inject({
        method: 'GET',
        url: '/monitor/liveness'
      });

      expect(res.statusCode).to.equal(200);
      expect((<models.MonitorResponse>JSON.parse(res.payload)).status).to.equal(true);
    });
  });

  describe('readiness', () => {
    it('responds with 200 status code and correct payload', async () => {
      const res: ServerInjectResponse = await server.inject({
        method: 'GET',
        url: '/monitor/readiness'
      });

      expect(res.statusCode).to.equal(200);
      expect((<models.MonitorResponse>JSON.parse(res.payload)).status).to.equal(true);
    });
  });
});