package FruitDrink;

import java.util.ArrayList;

/**
 * Created by VittalQSC on 11.02.2015.
 */
public class Container {
  private ArrayList<Fruit> fruits;
  private int changeNum;
  private boolean changed;

  public Container() {
    fruits = null;
    changeNum = 0;
    changed = false;
  }

  public Container(ArrayList<Fruit> fruits) {
    this.changeNum = 0;
    this.fruits = fruits;
    this.changed = false;
  }

  public int getWashingsNumber(){ return changeNum; }

  public boolean getChanged() { return changed; }

  public boolean mustNotBeWashed(ArrayList<Fruit> newFruits) {
    if(newFruits.containsAll(fruits)){
      return true;
    }
    else return false;
  }

  public void fillContainer(ArrayList<Fruit> newFruits) {
    this.fruits = newFruits;
  }

  public void lastWashing(){
    changeNum++;
    fruits = null;
  }
}
