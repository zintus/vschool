public class UserModel
{
    public bool IsApproved { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public UserModel(string pName, bool pIsApproved, string pEmail)
    {
        this.IsApproved = pIsApproved;
        this.Name = pName;
        this.Email = pEmail;
    }

    public UserModel() { }
}