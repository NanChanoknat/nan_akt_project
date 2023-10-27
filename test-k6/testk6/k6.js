import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 10,          // 10 virtual users
    duration: '30s',  // Test duration: 30 seconds
};

export default function () {
    // Send a GET request to the API endpoint
    let res = http.get('https://api.example.com/data');

    // Check if the response status is 200 (OK)
    check(res, {
        'status is 200': (r) => r.status === 200,
    });

    // Simulate user think time (pause for 1 second)
    sleep(1);
}
