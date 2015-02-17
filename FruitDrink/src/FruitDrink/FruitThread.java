package FruitDrink;

import java.util.ArrayList;

/**
 * Created by VittalQSC on 14.02.2015.
 */
public class FruitThread extends Thread {
  ArrayList<Fruit> juicesList;

  public FruitThread() {}

  public FruitThread(ArrayList<Fruit> juicesList) {
    this.juicesList = juicesList;
  }

  @Override
  public void run() {
    juicesList.sort(new FruitsComparator());
  }
}
