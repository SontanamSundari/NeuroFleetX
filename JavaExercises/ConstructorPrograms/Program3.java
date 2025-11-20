package ConstructorPrograms;
//Multiple Objects
public class Program3 {
        String name;
    int marks;

    Program3(String n, int m) {
        name = n;
        marks = m;
    }

    void show() {
        System.out.println(name + " scored " + marks);
    }

    public static void main(String[] args) {
        Program3 s1 = new Program3("Sundari", 90);
        Program3 s2 = new Program3("Bhavani", 85);

        s1.show();
        s2.show();
    }
}
