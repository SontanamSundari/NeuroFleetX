package ConditionalPrograms;
//Check Even or Odd
import java.util.Scanner;
public class Program1 {
     public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();

        if (n % 2 == 0)
            System.out.println("Even number");
        else
            System.out.println("Odd number");
    }
}
