import { describe, it, expect } from '@jest/globals';
import { Constants } from '../../src/constants';

describe('Constants', () => {
  it('Fetch nft.storage api key in solana-suite.json', () => {
    const apiKey = Constants.NFT_STORAGE_API_KEY;
    expect(apiKey).toEqual(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE'
    );
  });

  it('Constants use test', () => {
    const cluster = Constants.switchCluster({
      cluster: Constants.Cluster.test,
    });
    expect(cluster).toEqual(Constants.EndPointUrl.test);
  });

  it('Constants use dev', () => {
    const cluster = Constants.switchCluster({ cluster: Constants.Cluster.dev });
    expect(cluster).toEqual(Constants.EndPointUrl.dev);
  });

  it('Constants use localhost', () => {
    const cluster = Constants.switchCluster({
      cluster: Constants.Cluster.localhost,
    });
    expect(cluster).toEqual(Constants.EndPointUrl.localhost);
  });

  it('Constants use prd', () => {
    const cluster = Constants.switchCluster({ cluster: Constants.Cluster.prd });
    expect(cluster).toEqual(Constants.EndPointUrl.prd);
  });
});
