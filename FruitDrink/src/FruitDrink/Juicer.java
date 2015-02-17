package FruitDrink;

import java.util.*;

/**
 * Created by VittalQSC on 11.02.2015.
 */
public class Juicer {
  private ArrayList<Juice> juices;
  private Container container;
  public Juicer() {}

  public Juicer(ArrayList<Juice> juices,Container container) {
    this.juices = juices;
    this.container = container;
  }

  public void centrifugeAll() {
    juices.sort(new Comparator<Juice>() {
      @Override
      public int compare(Juice o1, Juice o2) {
        return o1.getFruits().size() - o2.getFruits().size();
      }
    } );
    while(juices.size() > 0) {
      container.fillContainer(juices.get(0).getFruits());
      int remPos = 0;
      for (int i = 1; i < juices.size(); i++) {
        ArrayList<Fruit> fruits =  juices.get(i).getFruits();
        if(container.mustNotBeWashed(fruits)) {
           container.fillContainer(fruits);
          juices.remove(remPos);
          i -= 1;
          remPos = i;
        }

      }
      if(remPos < juices.size()) {
        container.lastWashing();
        juices.remove(remPos);
      }
    }
  }
}
