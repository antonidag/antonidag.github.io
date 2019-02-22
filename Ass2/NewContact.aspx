<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.Master" AutoEventWireup="true" CodeBehind="NewContact.aspx.cs" Inherits="Ass2V0._2.NewContact" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container">
        <div class="jumbotron">
            <h3>Add new contact</h3>
            <h5>Name</h5>
            <asp:TextBox ID="textbox_name" runat="server" Width="300px" CssClass="form-control"></asp:TextBox>
            <h5>Address</h5>
            <asp:TextBox ID="textbox_address" runat="server" Width="300px" CssClass="form-control"></asp:TextBox>
            <h5>Phone number</h5>
            <asp:TextBox ID="textbox_phone" runat="server" Width="300px" CssClass="form-control"></asp:TextBox>
            <h5>Email</h5>
            <asp:TextBox ID="textbox_email" runat="server" Width="300px" CssClass="form-control"></asp:TextBox>
            <h4>User</h4>
            <asp:DropDownList ID="droplist_users" runat="server">
            </asp:DropDownList>
            <asp:Button ID="btn_create" Text="Create Contact" CssClass="btn btn-success" runat="server" OnClick="btn_create_Click" />
        </div>
    </div>

</asp:Content>
