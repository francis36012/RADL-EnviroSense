package envirosense.model;


public enum ConditionModifier {
	GT("Greater"),
	GE("GreaterOrEqual"),
	LE("LessOrEqual"),
	LT("Less"),
	EQ("Equal"),
	NE("NotEqual");
	
	String modifier;

	private ConditionModifier(String modifier) {
		this.modifier = modifier;
	}
}