package LoopingPrograms;
//Sum of First N Natural Numbers
public class Program2 {
        public static void main(String[] args) {
        int n = 5, sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
        System.out.println("Sum = " + sum);
    }
}
