package ConditionalPrograms;
//Find Largest of Three Numbers
public class Program2 {
        public static void main(String[] args) {
        int a = 20, b = 40, c = 30;

        if (a > b && a > c)
            System.out.println(a + " is largest");
        else if (b > c)
            System.out.println(b + " is largest");
        else
            System.out.println(c + " is largest");
    }
}
