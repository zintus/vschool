public class OpenIDModel
{
    public string Login { get; set; }
    public int Hash { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }

    public OpenIDModel(string login, int hash, string firstName, string lastName, string email)
    {
        this.Login = login;
        this.Hash = hash;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
    }

    public OpenIDModel() { }
}