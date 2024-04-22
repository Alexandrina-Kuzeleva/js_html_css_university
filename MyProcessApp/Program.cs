using System;
using System.Diagnostics;
using System.Linq;

class Program
{
    static void Main(string[] args)
    {
        try
        {
            Console.WriteLine("Список запущенных процессов:");
            Process[] processes = Process.GetProcesses();
            foreach (Process process in processes)
            {
                Console.WriteLine($"ID: {process.Id}, Имя: {process.ProcessName}");
            }

            Console.WriteLine("\nВведите ID процесса, который хотите завершить:");
            int id;
            if (int.TryParse(Console.ReadLine(), out id))
            {
                Process processToKill = processes.FirstOrDefault(p => p.Id == id);
                if (processToKill != null)
                {
                    processToKill.Kill();
                    Console.WriteLine($"Процесс с ID {id} был завершен.");
                }
                else
                {
                    Console.WriteLine($"Процесс с ID {id} не найден.");
                }
            }
            else
            {
                Console.WriteLine("Некорректный ID процесса.");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Произошла ошибка: {ex.Message}");
        }
    }
}