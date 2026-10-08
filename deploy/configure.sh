#!/bin/bash -e

#runs the deployer on index.src.html; the deployer writes
#index.prod.html and prod/ next to index.src.html
cd "$( dirname "$0" )"
php deployment-engine.php "$( pwd )/../index.src.html"
