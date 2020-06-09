using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
namespace Scramble
{
    class Program
    {

        static void Main(string[] args)
        {
            //https://docs.microsoft.com/en-us/dotnet/api/system.collections.hashtable?view=netframework-4.8
            Hashtable dictionary = new Hashtable();
            Hashtable letterScoures = new Hashtable
            {
                { 'a', 1 },
                { 'b', 3 },
                { 'c', 3 },
                { 'd', 2 },
                { 'e', 1 },
                { 'f', 4 },
                { 'g', 2 },
                { 'h', 4 },
                { 'i', 1 },
                { 'j', 8 },
                { 'k', 5 },
                { 'l', 1 },
                { 'm', 3 },
                { 'n', 1 },
                { 'o', 1 },
                { 'p', 3 },
                { 'q', 10 },
                { 'r', 1 },
                { 's', 1 },
                { 't', 1 },
                { 'u', 1 },
                { 'v', 4 },
                { 'w', 14 },
                { 'x', 18 },
                { 'y', 4 },
                { 'z', 10 }
            };
            Hashtable scrabbleLetterDistribution = new Hashtable
            {
                { 'a', 9 },
                { 'b', 2 },
                { 'c', 2 },
                { 'd', 1 },
                { 'e', 12 },
                { 'f', 2 },
                { 'g', 3 },
                { 'h', 2 },
                { 'i', 9 },
                { 'j', 1 },
                { 'k', 1 },
                { 'l', 4 },
                { 'm', 2 },
                { 'n', 6 },
                { 'o', 8 },
                { 'p', 2 },
                { 'q', 1 },
                { 'r', 6 },
                { 's', 4 },
                { 't', 6 },
                { 'u', 4 },
                { 'v', 2 },
                { 'w', 2 },
                { 'x', 1 },
                { 'y', 2 },
                { 'z', 1 }
            };
            List<string> ospdStrings = ReadFile("ospd[3896].txt");
            for (int i = 0; i < ospdStrings.Count; i++)
            {
                // Count value off words  
                int value = 0;
                string word = ospdStrings[i];
                for (int j = 0; j < word.Length; j++)
                {
                   int counter = (int)letterScoures[word[j]];
                   value += counter;
                }
                dictionary.Add(word, value);
            }

            List<string> shakespaeareStrings = ReadFile("words.shakespeare[3895].txt");
            for (int i = 0; i < shakespaeareStrings.Count; i++)
            {
                // If the dicionary do not contain the word remove it from the shakespeare list.
                if (!dictionary.ContainsKey(shakespaeareStrings[i]))
                {
                    shakespaeareStrings.RemoveAt(i);
                    i--;
                }
            }


            //https://www.dotnetperls.com/sort
            List<Word> words = new List<Word>();
            for (int i = 0; i < shakespaeareStrings.Count; i++)
            {
                Word w = new Word
                {
                    Letter = shakespaeareStrings[i],
                    Value = (int)dictionary[shakespaeareStrings[i]]
                };
                words.Add(w);
            }

            var sortedWords = (from elements in words
                              orderby elements.Value descending
                              select elements).ToList();

            List<string> top3Words = new List<string>();
            for (int i = 0; i < sortedWords.Count; i++)
            {
                //If we have three words break the loop. 
                if (top3Words.Count == 3)
                    break;
                string word = sortedWords[i].Letter;
                int counter = 0;
                Hashtable temp = new Hashtable();
                for (int j = 0; j < word.Length; j++)
                {
                    if (temp.Contains(word[j]))
                    {
                        int v = (int)temp[word[j]];
                        temp[word[j]] = v + 1;
                    }
                    else
                    {
                        temp.Add(word[j], 1);
                    }

                    int valueDist = (int)scrabbleLetterDistribution[word[j]];
                    int tempvalue = (int)temp[word[j]];


                    if(tempvalue > valueDist)
                    {
                        break;
                    }
                    counter++;

                    //This means that the word can be used. 
                    if(counter == word.Length)
                    {
                        top3Words.Add(word);

                    }

                }
            }
            foreach (var item in top3Words)
            {
                Console.WriteLine(item);
            }

            Console.ReadLine();

        }
        public static List<string> ReadFile(string path)
        {
            //https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/file-system/how-to-read-a-text-file-one-line-at-a-time
            List<string> list = new List<string>();
            string line;
            StreamReader file = new StreamReader(path);
            while ((line = file.ReadLine()) != null)
            {
                list.Add(line);
            }
            file.Close();
            return list;
        } 
    }
}
