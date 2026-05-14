import { makeAPI } from 'node-virustotal';
import axios, { AxiosRequestConfig } from 'axios';

const request = makeAPI().setKey(process.env.API_KEY ?? '');

class VirusTotalHelper {
  checkDomain(domain: string): Promise<string> {
    return new Promise((resolve, reject) => {
      request.domainLookup(domain, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  reduceUrl(domain: string): string {
    const headerUrls = ['https://', 'http://', 'http://www.', 'https://www.'];
    const found = headerUrls.find((h) => domain.includes(h));
    return found ? new URL(domain).hostname.replace('www.', '') : domain;
  }

  async checkFile(hash: string, options: AxiosRequestConfig): Promise<unknown> {
    return axios.get(`https://www.virustotal.com/api/v3/search?query=${hash}`, options);
  }
}

export default new VirusTotalHelper();
