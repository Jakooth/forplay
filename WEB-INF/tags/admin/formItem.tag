<?xml version="1.0"?>
<jsp:root 	xmlns:jsp="http://java.sun.com/JSP/Page" version="2.0"
			xmlns:c="http://java.sun.com/jsp/jstl/core">
    <jsp:directive.tag 	display-name="Forplay admin form item" 
						body-content="scriptless" language="java" />
    <jsp:directive.attribute name="id" required="true" />
    <jsp:directive.attribute name="label" required="true" />
    <jsp:directive.attribute name="placeholder" required="false" />
    <jsp:directive.attribute name="type" required="true" />
    <jsp:directive.attribute name="autocomplete" required="false" />
    <c:choose>
        <c:when test="${type == 'group'}">
            <label>
                <span>${label}:</span>
            </label>
            <div role="group" id="${id}">
                <!--AdminManager.js-->
            </div>
        </c:when>
        <c:otherwise>
            <label>
                <span>${label}:</span>
                <input id="${id}" placeholder="${placeholder}" type="${type}" autocomplete="${autocomplete}" />
            </label>
        </c:otherwise>
    </c:choose>
</jsp:root>
