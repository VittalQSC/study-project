package FruitDrink;

/**
 * Created by VittalQSC on 11.02.2015.
 */
public class Fruit{
  private String name;
  public Fruit() {}

  public Fruit(String name) {
    this.name = name;
  }
  public void setName(String name) {
    this.name = name;
  }

  public String getName() { return this.name; }

  public String toString(){
    return this.name;
  }

  public boolean equals(Object o) {
    Fruit O = (Fruit)o;
    return this.name.compareTo(O.getName()) == 0;
  }

  public int hashCode() { return name.hashCode(); }
}
