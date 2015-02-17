package FruitDrink;

import java.io.*;
import java.util.*;

/**
 * Created by Vitta Shacov on 10.02.2015.
 */

public class FruitDrink implements Serializable {

  public static ArrayList<String> readFile() throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(
    new FileInputStream("D:\\Java Programs\\FruitDrink\\src\\FruitDrink\\juice.in")));
    String line;
    ArrayList<String> al = new ArrayList<String>();
    while((line = br.readLine()) != null) {
      if(line.compareTo("") != 0) al.add(line);
    }
    return al;
  }

  public static ArrayList<Fruit> getFruits(String str) {
    ArrayList<Fruit> ans = new ArrayList<Fruit>();
    StringTokenizer st = new StringTokenizer(str);
    while( st.hasMoreTokens() ){
      ans.add(new Fruit(st.nextToken()));
    }
    return ans;
  }

  public static ArrayList<Juice> getJuices(ArrayList<String> str) {
    ArrayList<Juice> ans = new ArrayList<Juice>();
    for (String s : str) {
      ans.add( new Juice( getFruits( s ) ) );
    }
    return ans;
  }

  public static Set<Fruit> toLinkedHashSet(ArrayList<Juice> juices) {
    Set<Fruit> set = new LinkedHashSet<Fruit>();
    for (Juice juice : juices) {
      for (Fruit fruit : juice.getFruits()) {
        set.add(fruit);
      }
    }
    return set;
  }

  public static ArrayList<Fruit> toArrayList(ArrayList<Juice> juices) {
    ArrayList<Fruit> answer = new ArrayList<Fruit>();
    for (Juice juice : juices) {
      for (Fruit fruit : juice.getFruits()) {
        answer.add(fruit);
      }
    }
    return answer;
  }

  public static void printOutputFile1(Set<Fruit> set) throws IOException {
    BufferedWriter bw1 = new BufferedWriter(new OutputStreamWriter( new FileOutputStream("juice1.out")));
    Iterator<Fruit> it = set.iterator();
    while(it.hasNext()){
      bw1.write(it.next() + " ");
    }
    bw1.close();
  }

  public static void printOutputFile2(ArrayList<Fruit> fruitsList) throws IOException, InterruptedException {
    FruitThread ft = new FruitThread(fruitsList);
    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream("juice2.out")));
    ft.start();
    ft.join();
    Iterator<Fruit> it = fruitsList.iterator();
    while( it.hasNext() ){
      writer.write(it.next() + " ");
    }
    writer.close();
  }

  public static void printOutputFile3(ArrayList<Juice> juices) throws IOException {
    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter( new FileOutputStream("juice3.out")));
    Container container = new Container();
    Juicer juicer = new Juicer(juices,container);
    juicer.centrifugeAll();
    System.out.println(container.getWashingsNumber());
    writer.write(Integer.toString(container.getWashingsNumber()));
    writer.close();
  }

  public static void main(String[] args) throws IOException, InterruptedException {
    ArrayList<String> al = readFile();
    ArrayList<Juice> juices = getJuices(al);
    printOutputFile3(juices);

    Set<Fruit> set = toLinkedHashSet(juices);
    printOutputFile1(set);

    ArrayList<Fruit> fruitsList = toArrayList(juices);
    printOutputFile2(fruitsList);
  }
}
