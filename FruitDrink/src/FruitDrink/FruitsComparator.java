package FruitDrink;

import java.util.Comparator;

/**
 * Created by VittalQSC on 14.02.2015.
 */
public class FruitsComparator implements Comparator<Fruit> {

  @Override
  public int compare(Fruit o1, Fruit o2) {
    char[] o1Chars = o1.getName().toCharArray();
    char[] o2Chars = o2.getName().toCharArray();
    int min = 0;
    if(o1Chars.length < o2Chars.length) min = o1Chars.length;
    else min = o2Chars.length;
    for (int i = 0; i < min; i++) {
      if((int)o1Chars[i] != (int)o2Chars[i]) { return (int)o1Chars[i] - (int)o2Chars[i]; }
    }
    return o1.getName().length() - o2.getName().length();
  }
}
