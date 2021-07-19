# simple-node-cluster

## scripts test

Loadtest

loadtest -n 1000 -c 100 --rps 200 http://localhost:3000?number=20

artillery quick --count 10 -n 20 http://localhost:3000?number=20
