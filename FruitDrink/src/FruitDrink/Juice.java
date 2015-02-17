package FruitDrink;

import java.util.ArrayList;

/**
 * Created by VittalQSC on 11.02.2015.
 */
public class Juice {
  private ArrayList<Fruit> fruits;

  public Juice() {}

  public Juice(ArrayList<Fruit> fruits) {
    this.fruits = fruits;
  }

  public ArrayList<Fruit> getFruits() { return fruits; }

  public String toString() {
    String line = "";
    for (Fruit fruit : fruits) {
      line += fruit.toString() + " ";
    }
    return "Juice components: " + line;
  }
}
