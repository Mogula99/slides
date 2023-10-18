for (y = FTOT(viewY) - 5; y < ITOT(FTOI(viewY) + viewH) + 5; y++) {
    for (x = FTOT(viewX) - 5; x < ITOT(FTOI(viewX) + canvasW) + 5; x++) {
        if ((x >= 0) && (y >= 0) && (x < LW) && (y < LH) &&
            grid[y][x].event && (grid[y][x].event < 121) &&
            (eventSet[grid[y][x].event].difficulty <= game->getDifficulty())) {
            while (event) {
                if (event->isFrom(x, y)) break;
                event = event->getNext();
            }
            if (!event) { // event not found -> create it
                switch (getEvent(x, y)->movement) {
                    case 28:
                        events = new JJ1Bridge(x, y);
                        break;
                    case 41:
                        events = new MedGuardian(x, y);
                    ...
                }
            }
        }
    }
}