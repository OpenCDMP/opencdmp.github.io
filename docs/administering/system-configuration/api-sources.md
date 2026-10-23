---
sidebar_position: 3
description: Call an external API from a reference type or a prefilling source, with its request, authentication, search rules, response mapping, and path syntax
---

# Connecting to an external API

[Reference types](/docs/administering/system-configuration/reference-types.md) and [prefilling sources](/docs/administering/system-configuration/prefilling-sources.md) both look entries up live in an external API, and both configure the call with the same building blocks: a **request**, its **headers** and **authentication**, **search rules** that fill the placeholders of the request, and a **test and map** step that reads the reply.

| Block | In a reference type | In a prefilling source |
|---|---|---|
| [Request](#request) | The **Request** step of a **Search API** source | The **Request** step of the **2 Search** and **3 Full record** tabs |
| [Headers](#headers) and [authentication](#authentication) | The **Request** step of each source | The **1 Connection** tab, once for both requests |
| [Search rules](#search-rules) | The **Search rules** step of each source | The **Search rules** step of both requests |
| [Test and map](#test-and-map) | The **Test and map** step of each source | The **Test and map** step of both requests |

---

## Request {#request}

- **Method**: `GET` or `POST`.
- **URL**: The endpoint to call. Use placeholders in braces, such as `{like}`, where values go; the **Insert** buttons add the placeholders defined in [Search rules](#search-rules) as well as `{page}` and `{pageSize}`. For example:
  ```text
  https://pub.orcid.org/v3.0/expanded-search/?q={like}&start={page}&rows={pageSize}
  ```
- **First page number**: The starting value of `{page}`. Some APIs count from `0`, others from `1`. `{pageSize}` is `50` unless the search asks for another size.
- **Request body (JSON)**: *Only with `POST`.* The body to send. It takes the same placeholders as the URL.

## Headers {#headers}

- **Content-Type**: The content type sent with the request, typically `application/json`.
- **Add header**: Adds one of the supported headers (`ACCEPT`, `CONNECTION`, `ALLOW HEADER`, `ALLOW ORIGIN`, `ALLOW CREDENTIALS`, `ORIGIN`) with its value. Custom headers, such as API keys, are not supported.

## Authentication {#authentication}

Some APIs require a token. Turn on **Needs a token** to configure it in three steps:

1. **Get a token**: The **Method** and **Token URL** of the token endpoint, and the **Request body**, which is sent as JSON. For OAuth2 client credentials, for example:
   ```json
   {"grant_type": "client_credentials", "client_id": "my-client-id", "client_secret": "my-client-secret"}
   ```
2. **Read the token from the reply**: The **Token field** is the name of a top-level field of the reply (for example `access_token`), not a path. The **Token type** defaults to `Bearer`.
3. **Sent with every search as**: The editor shows the resulting header, for example `Authorization: Bearer <token>`.

With the toggle off, the API is called without a token.

The request body usually holds a password or a client secret, so it is stored encrypted and never shown again after you save. The field then reads **Stored encrypted. Leave empty to keep it.** Leave it empty to keep the saved body, or type a new one to replace it. Tests use the saved body when the field is empty, and **Export XML** leaves it out.

---

## Search rules {#search-rules}

Search rules decide what replaces each placeholder in the URL or the request body.

- **Who filters the results**:
  - **The API**: The search text goes to the API, which returns matching entries. This is the most common setting.
  - **The application**, shown with the application's name: For APIs without search. The application keeps the entries whose name contains the search text, so the rules only need a default.
- **Depends on**: *Reference types only.* Other reference types whose picked entries a rule can use, for example to send the ID of the organisation picked from ROR. Shown when other reference types exist.

Click `Add placeholder` and set its **Placeholder name** (the first one is named `like`). Use `{like}` in the URL or the request body; its rules decide what replaces it. Each placeholder has a list of rules and a fallback:

- **Rules**: Click `Add rule` to open the rule dialog:
  - **When the search text…**: Pick a **Condition** (`is anything`, `is two words`, `looks like an ORCID iD`, `looks like a DOI`, or `matches my own pattern`) or type a **Pattern**, a regular expression the whole text must match. Optionally **Split into parts on** a space, a comma, or your own separator; the parts become `{like1}`, `{like2}`, and so on, and `{like}` is then not filled.
  - **…and, optionally, when a picked entry…**: Choose a reference type from **Depends on** in **From reference type**, and the source it **Came from source**. With this set, the rule wins over plain ones and ignores the search text: insert the picked entry's `{reference}`, `{label}`, or `{source}` instead.
  - **…send this as `{like}`**: The **Value to send**, for example `{like}` or `given-names:{like1} AND family-name:{like2}`. The dialog warns when the value uses placeholders the split setting does not fill.
  - **Check with**: Type a sample search to see whether the rule matches and what it sends.
- **No rule matches (e.g. empty search)**: The value to **Send instead**, for example `*`.

Rules about a picked entry win; otherwise the first rule that matches applies. A placeholder only sends the search text through a rule, so for a plain search add a rule with the condition `is anything` and the value `{like}`.

Below the rules, **Try a search** shows, for a sample search text, which rule matches for each placeholder and what it sends.

:::note
Rules about a picked entry cannot be tried in the editor, because nothing is picked there.
:::

---

## Test and map {#test-and-map}

This step calls the API with the request as it is now configured and maps its reply, side by side.

1. Enter a sample search in **Test with search text** and press `Run test`. The button is disabled until the [Request](#request) step has a method and a URL.
2. The result shows the HTTP status, the number of results, the total count, the response time, and the URL that was sent, or the error the API returned. If the reply looks like XML but the format is set to JSON (or the reverse), a warning offers to **Switch** the format.

The **Response** panel sets how the reply is read:

- **Response format**: `JSON` or `XML`. It determines the [path language](#path-syntax): JSONPath for JSON and XPath for XML.
- **Results are in**: The path to the collection of result items. Given `{ "expanded-result": [ ... ] }`, it is `$.expanded-result`; given `<list><repository>…</repository>…</list>`, it is `//repository`.
- **Total count is in** *(optional)*: The path to the total number of matching results, which OpenCDMP shows to users instead of the size of the current page. It must resolve to a single number, for example `$.num-found` or `/list/@total`. Leave it empty if the API does not return a total.
- **Namespaces** *(XML only)*: See [Namespaces](#namespaces).

After a test, the panel shows the reply as a tree, one result at a time (`Result 1 of 10`, with previous and next buttons). Click a value in the tree to use its path for the value you are editing. When the result items cannot be shown as a tree, for example for XML, the raw reply is shown instead.

The mapping panel next to it lists the values read from each result item:

- In a reference type (**Map to fields**), one row per field: the built-in **Reference ID**, **Name**, and **Description**, and the type's own fields. `Entries without a Reference ID or Name are dropped.`
- In the search of a prefilling source (**What authors pick from**), the **Reference ID**, **Name**, and **Description** of the pick list, plus, without a full record, the values named for the fill rules. The full record names only the values for the fill rules.

For each row:

- **Path in the reply**: The path to the value inside **one result item**.
- **First value only**: Takes the first value when the path returns a list. It adds `.first()` to the path.
- **Preview**: The value the path gives for the result on show. For JSON replies the preview updates as you edit the path. For paths it cannot follow, and for XML, it shows the value from the last run with the note `From the last run. Run the test again to update.`

:::note
Older configurations may have **Total count is in** set to a placeholder value such as `$[*]` or a copy of **Results are in**. Such values produce no usable count and are ignored; clear the field or set a real total-count expression to show accurate counts.
:::

---

## Path syntax {#path-syntax}

Paths point to a value within a **single result item**, in the dialect of the response format:

- `JSON`: [JSONPath](https://goessner.net/articles/JsonPath/), for example `$.orcid-identifier.path`.
- `XML`: [XPath](https://www.w3.org/TR/xpath-31/), for example `./id/text()` or `./link/@href`.

:::tip
Some APIs return fields that can be either a plain text value or an array of objects depending on the record. Append `.first()` to the JSONPath expression (or tick **First value only**) to handle both cases:
```text
$.person.name.value.first()
```
This returns the text value if it is a string, or the text of the first array element if it is an array.

For nested structures where multiple levels may be arrays:
```text
$.affiliation-group.first().affiliation.first().organization.name
```

For XML sources, use the native XPath equivalent, the `[1]` predicate, to select the first match:
```text
./affiliation-group[1]/affiliation[1]/organization/name/text()
```
The `.first()` shortcut is also accepted on XML paths, where it has no effect, because XPath already returns the text of the first match.
:::

:::tip
To **concatenate multiple response values** into a single field, use the `@{{RESPONSE_PATH}}` syntax:
```text
@{{first-name}} @{{family-name}}
```
This combines two separate API fields into one output value, which is useful for composing a full name as the Name. The same syntax works for both JSON and XML sources; the inner expressions are evaluated using the corresponding dialect.
:::

### Namespaces {#namespaces}

The namespace list appears in **Test and map** for `XML` replies only. It declares prefix-to-URI bindings that your XPath expressions can use in the URL, **Results are in**, **Total count is in**, and the mappings.

For each namespace, click `Add namespace` and enter:

- **Prefix**: A short identifier you choose to reference this namespace within your XPath expressions. It does not need to match the prefix the XML document itself uses, because the XPath engine matches on URI. By convention, use the prefix the schema usually uses, such as `oai`, `dc`, or `datacite`.
- **URI**: The namespace URI as declared by the schema, for example `http://www.openarchives.org/OAI/2.0/` or `http://purl.org/dc/elements/1.1/`.

Some XML APIs declare namespaces, for example OAI-PMH, DataCite, and Crossref UNIXREF. A plain `//record` will not match `<oai:record xmlns:oai="…">`, because the element's qualified name is bound to a namespace URI. With declared bindings, your XPath expressions can use the prefixes directly:

```text
//oai:record/dc:title/text()
```

If you would rather not declare namespaces, you can fall back to the namespace-agnostic `local-name()` idiom:

```text
//*[local-name()='record']/*[local-name()='title']/text()
```

This is more verbose and does not distinguish between elements that share a local name across different namespaces. Prefer declared bindings whenever the upstream schema is stable. APIs that return plain unprefixed XML (such as re3data) need no namespace setup.

:::tip
**Default namespaces (`xmlns="…"` without a prefix).** XPath 1.0, the dialect used here, has no concept of a default namespace for queries. To match elements declared in a default namespace, bind *some* prefix to the namespace URI, then use that prefix in your expressions. For example, given `<feed xmlns="http://www.w3.org/2005/Atom">`, declare the prefix `atom` for `http://www.w3.org/2005/Atom`, then write `//atom:feed/atom:entry/atom:title/text()`.
:::

:::note
**Common namespace URIs:**

| Schema | Typical Prefix | URI |
|--------|-----------------|------|
| OAI-PMH | `oai` | `http://www.openarchives.org/OAI/2.0/` |
| Dublin Core | `dc` | `http://purl.org/dc/elements/1.1/` |
| Atom | `atom` | `http://www.w3.org/2005/Atom` |
| DataCite | `datacite` | `http://datacite.org/schema/kernel-4` |
| Crossref UNIXREF | `cr` | `http://www.crossref.org/xschema/1.1` |
:::

---

## See also

- [Reference types](/docs/administering/system-configuration/reference-types.md) - Sources of the references authors pick
- [Reference type recipes](/docs/administering/system-configuration/reference-type-recipes.md) - Worked examples for ORCID, re3data, and a fixed list
- [Prefilling sources](/docs/administering/system-configuration/prefilling-sources.md) - Starting an asset from an external record
