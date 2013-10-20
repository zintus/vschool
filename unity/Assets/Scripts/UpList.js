#pragma strict

private var script_name_1 = "NameMovie"; 
function OnMouseDown () {

var s1 = transform.parent.transform.Find("Plane").GetComponent(NameMovie);
	if(s1.n1!=0){
	//print(s1.all);
	//print(s1.n1);
    var list1 = transform.parent.transform.Find("List1").gameObject;
	var list2 = transform.parent.transform.Find("List2").gameObject;
	var list3 = transform.parent.transform.Find("List3").gameObject;
	var list4 = transform.parent.transform.Find("List4").gameObject;
	list1.GetComponent(TextMesh).text = s1.hdr[s1.n1-4]; 
	list2.GetComponent(TextMesh).text = s1.hdr[s1.n1-3];
	list3.GetComponent(TextMesh).text = s1.hdr[s1.n1-2];
	list4.GetComponent(TextMesh).text = s1.hdr[s1.n1-1];
	s1.n1=s1.n1-1;
	//print(s1.n1);
	}
}