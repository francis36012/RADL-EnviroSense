package envirosense.model;


/**
 * A ConditionModifier represents a logical operator used when evaluating conditions
 * 
 * @author Francis Agyapong <francis.agyapong@edu.sait.ca>
 */
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
	
	/**
	 * Returns the string representation of modifier
	 * @return String representation of modifier
	 */
	public String getConditionModifier() {
		return modifier;
	}
}