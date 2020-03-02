using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Person
    {
        [Key]
        public string PhoneNumber { get; set; }
        public string Name { get; set; }       
    }
}