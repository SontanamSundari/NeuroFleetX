package ConstructorPrograms;
//Constructor Example
public class Program2 {
        String course;
    int duration;

    Program2(String c, int d) {
        course = c;
        duration = d;
    }

    void display() {
        System.out.println("Course: " + course + ", Duration: " + duration + " months");
    }

    public static void main(String[] args) {
        Program2 obj = new Program2("Java Full Stack", 6);
        obj.display();
    }
}
